[database]
server = localhost
username = root
password = cloud1234
database = smarttravel
port = 3306
connection_file = backend/conn.php

[project]
name = SmartTravel
type = PHP Web Application
root = /var/www/html
domain = smpoc.site
url = https://smpoc.site

[directories]
backend = backend/
backend_api = backend/api/
admin = admin/
admin_api = admin/backend/api/
user = user/
js = js/
css = css/
assets = Assets/
common = common/
images = images/
uploads = uploads/
templates = _templates/
docs = docs/
logs = logs/
scripts = scripts/
public = public/

[exclude]
e2e = _e2e/
reports = _reports/

[tables_core]
accounts = 사용자 계정
guides = 가이드 정보
agent = 에이전트
branch = 지점
company = 회사
employee = 직원

[tables_booking]
booking = 예약 (구)
bookings = 예약 (신)
booking_history = 예약 이력
booking_options = 예약 옵션
booking_rooms = 예약 객실
booking_services = 예약 서비스
booking_travelers = 예약 여행자
bookingcomments = 예약 코멘트

[tables_package]
packages = 여행 패키지
package_attractions = 패키지 관광지
package_availability = 패키지 가용성
package_available_dates = 패키지 가능 날짜
package_file = 패키지 파일
package_flights = 패키지 항공
package_i18n = 패키지 다국어
package_images = 패키지 이미지
package_itinerary = 패키지 일정
package_options = 패키지 옵션
package_pricing_options = 패키지 가격 옵션
package_schedules = 패키지 스케줄
package_travel_costs = 패키지 여행 비용
package_usage_guide = 패키지 이용 안내
package_views = 패키지 조회수

[tables_visa]
visa_applications = 비자 신청
visa_documents = 비자 서류
visa_status_history = 비자 상태 이력
visarequirements = 비자 요구사항

[tables_payment]
payment = 결제 (구)
payments = 결제 (신)
paymentc = 결제C
payment_methods = 결제 수단

[tables_content]
reviews = 리뷰
review_images = 리뷰 이미지
inquiries = 문의
inquiry_attachments = 문의 첨부파일
inquiry_replies = 문의 답변
notices = 공지사항
notice_attachments = 공지 첨부파일
notifications = 알림
popups = 팝업
banners = 배너

[tables_i18n]
i18n_texts = 다국어 텍스트
languages = 언어
guide_i18n = 가이드 다국어
inquiry_i18n = 문의 다국어
inquiry_reply_i18n = 문의 답변 다국어
notice_i18n = 공지 다국어
schedule_i18n = 스케줄 다국어

[tables_user]
user_activity_logs = 사용자 활동 로그
user_language_settings = 사용자 언어 설정
user_notifications = 사용자 알림
user_profiles = 사용자 프로필
user_sessions = 사용자 세션
user_settings = 사용자 설정
user_term_agreements = 사용자 약관 동의

[tables_guide]
guide_announcements = 가이드 공지
guide_assignments = 가이드 배정
guide_locations = 가이드 위치
guide_notices = 가이드 알림

[tables_other]
activity_logs = 활동 로그
login_attempts = 로그인 시도
meeting_locations = 미팅 장소
travel_schedules = 여행 스케줄
traveler_details = 여행자 상세
traveler_info = 여행자 정보
terms = 약관
terms_and_policies = 약관 및 정책
favorites = 즐겨찾기
file_uploads = 파일 업로드
device_tokens = 디바이스 토큰
push_queue = 푸시 큐
system_settings = 시스템 설정
