from pydantic import BaseModel, Field

class HscodeRequest(BaseModel):
    item: str = Field(..., description="HS 코드를 조회할 물품명 (e.g., '선풍기')")

# --- 신규: /getHscode 응답 객체 스키마 ---
# 응답 JSON 배열의 각 요소에 해당하는 모델
class HscodeResponse(BaseModel):
    hscode: str
    item: str

class FtaRequest(BaseModel):
    hscode: str = Field(..., description="HS 코드 (e.g., 8517.12-1010)")
    origin_country: str = Field(..., description="원산지 국가 (e.g., '미국', '베트남')")

# /getFta 응답 스키마
class FtaResponse(BaseModel):
    fta_status: str = Field(..., description="FTA 협정 유무 및 명칭 (e.g., '한-미 FTA 적용 가능')")
    tariff_rate: str = Field(..., description="적용 관세율 (e.g., '0%', '8% (기본세율)')")