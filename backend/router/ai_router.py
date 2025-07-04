import os
import json # JSON 파싱을 위해 추가
from fastapi import APIRouter, HTTPException # 오류 처리를 위해 HTTPException 추가
from pydantic import BaseModel, Field # 스키마 정의를 위해 BaseModel, Field 추가
from dotenv import load_dotenv, find_dotenv
from schema.chat_schema import HscodeRequest, HscodeResponse, FtaRequest, FtaResponse

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate


# =================================================================
# 2. FastAPI 라우터 및 LLM 설정
# =================================================================

# APIRouter 인스턴스 생성
router = APIRouter(prefix="/ai")

# .env 파일에서 환경 변수 로드
_ = load_dotenv(find_dotenv())

# LLM 모델을 한 번만 초기화하여 재사용 (효율성)
llm = ChatOpenAI(
    model="gpt-4.1-mini",
    api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.1, # 사실 기반 응답의 일관성을 위해 온도를 낮게 설정
)


# =================================================================
# 3. HS 코드 추천 기능 (/chat)
# =================================================================

#HS 코드 추천을 위한 시스템 프롬프트
# hs_code_system_prompt = """
# ### Role and Goal
# You are a highly specialized AI assistant for classifying HS codes. Your sole purpose is to convert a user's product name into a structured, minified JSON array of potential HS codes. The output will be directly parsed by a computer program, so absolute adherence to the format is critical.

# ### Input
# - You will receive a single product name in Korean in the `{item}` variable.

# ### Output Requirements (Strictly Enforced)
# 1.  **Format**: The response MUST be a single, raw, minified JSON array. It must start with `[` and end with `]`.
# 2.  **Content**: The array must contain JSON objects. Each object MUST have exactly two string keys:
#     - `"hscode"`: The recommended HS code.
#     - `"item"`: A representative example of the product in Korean.
# 3.  **Behavior**: If the input item can be subdivided (e.g., '칼' can be a kitchen knife, a pocket knife, etc.), provide a comprehensive list covering all major types.
# 4.  **Prohibitions (Non-Negotiable)**:
#     - NEVER include any text, explanations, or greetings before or after the JSON array.
#     - NEVER use markdown formatting like ```json ... ```.
#     - NEVER use newlines or excessive whitespace. The entire output must be a single line of text.

# ### Example
# User Input ({item}): 칼
# Your Correct Response (Raw JSON String):
# [{{"hscode":"8211.92-1000","item":"주방용 식칼"}},{{"hscode":"8211.92-2000","item":"정육용 칼"}},{{"hscode":"8211.93-0000","item":"접이식 포켓나이프"}},{{"hscode":"8211.92-3000","item":"사냥용 칼"}},{{"hscode":"8208.30-0000","item":"기계용 절단 칼날"}},{{"hscode":"9307.00-0000","item":"의장용 검"}}]
# """

#hs 프롬프트 작성
hs_code_system_prompt = """
### Role and Goal
You are a highly specialized AI assistant for classifying Harmonized System (HS) codes. Your sole purpose is to convert a user's product name into a structured, minified JSON array of potential HS codes. The output will be directly parsed by a computer program, so absolute adherence to the format is critical.

### Input
- You will receive a single product name in Korean in the `{item}` variable.

### Output Requirements (Strictly Enforced)
1.  **Format**: The response MUST be a single, raw, minified JSON array. It must start with `[` and end with `]`.
2.  **Content**: The array MUST contain JSON objects. Each object MUST have exactly two string keys:
    - `"hscode"`: The recommended HS code (e.g., "6601.10-0000").
    - `"item"`: A precise, Korean-language sub-classification or detailed description of the product. This should be a specific example or type of the input item.
3.  **Detail Level**: If the input item is broad or can be subdivided (e.g., '우산' can be a long umbrella, folding umbrella, golf umbrella, etc.), provide a comprehensive list of **5 to 10 distinct and common sub-classifications** covering the major types or uses. Aim for diversity and relevance to help the user identify their specific product.
4.  **Prohibitions (Non-Negotiable)**:
    - NEVER include any text, explanations, greetings, or additional markdown (like ```json) before or after the JSON array.
    - NEVER use newlines or excessive whitespace. The entire output must be a single line of text.

### Example 1: User Input (Item: 우산)
Your Expected Response (Raw JSON String):
[{{"hscode":"6601.10-0000","item":"장우산"}},{{"hscode":"6601.91-0000","item":"접이식 우산"}},{{"hscode":"6601.99-1000","item":"골프 우산"}},{{"hscode":"6601.99-2000","item":"양산"}},{{"hscode":"6601.99-9000","item":"아동용 우산"}},{{"hscode":"6601.99-9000","item":"자동 개폐 우산"}},{{"hscode":"6601.99-9000","item":"캐노피 우산 (야외용)"}}]

### Example 2: User Input (Item: 칼)
Your Expected Response (Raw JSON String):
"""

# 프롬프트 템플릿의 변수를 {query}에서 {item}으로 수정
hs_code_prompt = ChatPromptTemplate.from_messages([
    ("system", hs_code_system_prompt),
    ("human", "{item}"),
])
hs_code_chain = hs_code_prompt | llm

# --- 엔드포인트 수정 ---
# response_model을 List[HscodeItem]으로, 요청 스키마를 HscodeRequest로 변경
@router.post("/getHscode", response_model=list[HscodeResponse])
async def get_hs_codes(req: HscodeRequest):
    """
    사용자가 입력한 물품명(item)에 대해 HS 코드 목록을 순수 JSON 배열로 반환합니다.
    """
    print(f"입력 (HS코드 추천): {req.item}")
    try:
        # 체인 호출 시 변수명을 'item'으로 전달
        result = hs_code_chain.invoke({"item": req.item})
        
        # LLM의 응답(JSON 문자열)을 Python 리스트로 파싱
        response_data = json.loads(result.content)
        
        # 파싱된 리스트를 그대로 반환 (FastAPI가 JSON 배열로 변환해 줌)
        return response_data
    
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI 모델로부터 유효한 JSON 배열 응답을 받지 못했습니다.")
    except Exception as e:
        print(f"오류 발생: {e}")
        raise HTTPException(status_code=500, detail="예상치 못한 오류가 발생했습니다.")


#FTA 프롬프트 작성
fta_system_prompt = """Role and Goal
You are a highly accurate trade data AI assistant. Your goal is to determine FTA applicability and tariff rates for goods imported into South Korea based on a provided list of partner countries.

Context: South Korea's Active FTA Partner Countries
For your reference, here is a list of countries and economic blocs that have an active Free Trade Agreement with South Korea. Use this list as the single source of truth for FTA status.

Americas: United States, Canada, Chile, Peru, Colombia, Central America (Costa Rica, El Salvador, Honduras, Nicaragua, Panama)

Europe: European Union (EU), United Kingdom (UK), EFTA (Switzerland, Norway, Iceland, Liechtenstein), Turkey

Asia-Pacific: Australia, New Zealand, Vietnam, Singapore, India, China, Philippines, Indonesia

Regional: ASEAN (Brunei, Cambodia, Indonesia, Laos, Malaysia, Myanmar, Philippines, Singapore, Thailand, Vietnam), RCEP

Middle East: Israel

Logic and Instructions
You will receive an HS code and an origin country. Follow this logic strictly:

Check for FTA: Look up the provided {origin_country} in the 'South Korea's Active FTA Partner Countries' list above. (Note: A country like "Germany" is part of the "European Union (EU)").

If an FTA EXISTS (the country is on the list):

The JSON key "fta_status" MUST be boolean true.

Find the preferential tariff rate for the {hscode} under that specific FTA. The most common rate is 0.

The JSON key "tariff_rate" MUST be an integer representing only the numerical tariff rate. Example: 0.

If an FTA DOES NOT EXIST (the country is NOT on the list):

The JSON key "fta_status" MUST be boolean false.

Provide South Korea's standard, non-preferential tariff rate (this is called the 'Basic Tariff Rate' or 'WTO MFN Rate').

The JSON key "tariff_rate" MUST be an integer representing only the numerical tariff rate. Example: 8.

Output Format (Strictly Enforced)
You MUST return your answer ONLY as a single, minified JSON object.

DO NOT include any explanations, greetings, or markdown formatting like ```json.

The JSON object must contain exactly two keys: "fta_status" (boolean) and "tariff_rate" (integer).

Examples
User Input: hscode: "8703.23-1000", origin_country: "United States"

Your Output: {{"fta_status":true,"tariff_rate":0}}

User Input: hscode: "0805.50-1000", origin_country: "Vietnam"

Your Output: {{"fta_status":true,"tariff_rate":0}}

User Input: hscode: "6204.42-0000", origin_country: "Brazil"

Your Output: {{"fta_status":false,"tariff_rate":13}}

User Input: hscode: "9018.12-0000", origin_country: "Germany"

Your Output: {{"fta_status":true,"tariff_rate":0}}
"""



# FTA 조회를 위한 새로운 프롬프트 템플릿 및 체인
fta_prompt = ChatPromptTemplate.from_messages([
    ("system", fta_system_prompt),
    ("human", "HS Code: {hscode}, Origin Country: {origin_country}"),
])
fta_chain = fta_prompt | llm

@router.post("/getFta", response_model=FtaResponse)
async def get_fta_info(req: FtaRequest):
    """
    HS코드와 원산지(국가)를 입력받아 FTA 협정 유무와 관세율을 JSON 형식으로 반환하는 API 엔드포인트
    """
    print(f"입력 (FTA 조회): HS Code={req.hscode}, Origin Country={req.origin_country}")
    
    try:
        # HS코드와 원산지 국가로 체인 실행
        result = fta_chain.invoke({
            "hscode": req.hscode,
            "origin_country": req.origin_country
        })
        
        # LLM의 응답(JSON 문자열)을 Python 딕셔너리로 파싱
        response_data = json.loads(result.content)

        # 파싱된 데이터로 응답 모델 객체 생성 후 반환
        return FtaResponse(**response_data)
        
    except json.JSONDecodeError:
        # LLM이 유효한 JSON을 반환하지 않은 경우의 예외 처리
        raise HTTPException(status_code=500, detail="AI 모델로부터 유효한 JSON 응답을 받지 못했습니다.")
    except Exception as e:
        # 기타 예외 처리
        print(f"오류 발생: {e}")
        raise HTTPException(status_code=500, detail="예상치 못한 오류가 발생했습니다.")
    

    