package com.smhrd.gloring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.gloring.dto.request.CalculatorRequestDto;
import com.smhrd.gloring.dto.response.CalculatorResponseDto;
import com.smhrd.gloring.entity.Calculator;
import com.smhrd.gloring.entity.User;
import com.smhrd.gloring.entity.UserCalculator;
import com.smhrd.gloring.repository.CalculatorRepository;
import com.smhrd.gloring.repository.UserCalculatorRepository;
import com.smhrd.gloring.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor // final 필드에 대한 생성자 자동 주입
public class CalculatorService {

    private final CalculatorRepository calculatorRepository;
    private final UserRepository userRepository;
    private final UserCalculatorRepository userCalculatorRepository;

    // 계산기 정보 저장
    @Transactional
    public CalculatorResponseDto saveCalculator(CalculatorRequestDto requestDto, String userEmail) {
        try {
            // 1. 현재 로그인된 사용자 정보 조회
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 사용자를 찾을 수 없습니다: " + userEmail));
            System.out.println(">>> User 조회 성공: " + user.getEmail());

            // 2. DTO를 Calculator 엔티티로 변환하여 저장
            Calculator calculator = requestDto.toEntity();
            Calculator savedCalculator = calculatorRepository.save(calculator);
            System.out.println(">>> Calculator 저장 성공, 생성된 ID: " + savedCalculator.getCalId());

            // 3. User와 Calculator를 연결하는 UserCalculator 엔티티 생성 및 저장
            UserCalculator userCalculator = new UserCalculator(user, savedCalculator);
            
            // [핵심] userCalculator 저장 시도를 하고, 반환된 객체의 ID를 확인합니다.
            UserCalculator savedUserCalculator = userCalculatorRepository.save(userCalculator);
            System.out.println(">>> UserCalculator 저장 성공, 생성된 ID: " + savedUserCalculator.getId());

            // 4. 저장된 정보를 Response DTO로 변환하여 반환
            CalculatorResponseDto cDto = new CalculatorResponseDto(savedCalculator);
            System.out.println(">>> 최종 결과 DTO 생성 완료");
            return cDto;

        } catch (Exception e) {
            // [중요] 예외를 직접 잡아서 전체 스택 트레이스를 콘솔에 출력합니다.
            // 이 로그를 확인하면 정확한 원인을 알 수 있습니다.
            System.err.println("!!! 트랜잭션 도중 심각한 오류가 발생했습니다 !!!");
            e.printStackTrace(); // 콘솔에 빨간색으로 전체 에러 로그가 표시됩니다.
            
            // 클라이언트에게 오류를 알리기 위해 예외를 다시 던집니다.
            throw new RuntimeException("계산기 저장 중 서버 오류가 발생했습니다.", e);
        }
    }

    // 특정 사용자의 모든 계산기 정보 조회
    @Transactional(readOnly = true) // 읽기 전용 트랜잭션으로 성능 향상
    public List<CalculatorResponseDto> getCalculatorsByUser(String userEmail) {
        // 1. 현재 로그인된 사용자 정보 조회
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 사용자를 찾을 수 없습니다: " + userEmail));
        
        
        // 2. 사용자와 연결된 모든 UserCalculator 항목 조회
        List<UserCalculator> userCalculators = userCalculatorRepository.findByUser(user);

        // 3. 조회된 UserCalculator 리스트에서 Calculator 정보만 추출하여 Response DTO 리스트로 변환
        return userCalculators.stream()
                .map(userCalculator -> new CalculatorResponseDto(userCalculator.getCalculator()))
                .collect(Collectors.toList());
    }

    public CalculatorResponseDto getCalculatorById(Long calculatorId) {
        Calculator calculator = calculatorRepository.findById(calculatorId)
                .orElseThrow(() -> new EntityNotFoundException("Calculator not found with id: " + calculatorId));
        return convertToDto(calculator);
    }

    // Calculator Entity를 CalculatorResponseDto로 변환하는 private 메서드
    private CalculatorResponseDto convertToDto(Calculator entity) {
        return new CalculatorResponseDto(
                entity.getCalId(),
                entity.getProductName(),
                entity.getHscode(),
                entity.getPurchaseAmount(),
                entity.getExchangeRate(),
                entity.getOrigin(),
                entity.getTariff(),
                entity.getOtherCost(),
                entity.getPurchaseCost(),
                entity.getExpectedSales(),
                entity.getFreightFee(),
                entity.getAdCost(),
                entity.getPlatformFee(),
                entity.getShippingFee(),
                entity.getOtherFees(),
                entity.getNetSales(),
                entity.getRevenueRate(),
                entity.getProfit(),
                entity.getVat(),
                entity.getFta(),
                entity.getTotalFee(),
                entity.getSaveDate(),
                entity.getCost(),
                entity.getCountry_money()
        );
    }

}