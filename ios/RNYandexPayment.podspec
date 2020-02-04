# frozen_string_literal: true

require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |spec|
  # ―――  Spec Metadata  ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  These will help people to find your library, and whilst it
  #  can feel like a chore to fill in it's definitely to your advantage. The
  #  summary should be tweet-length, and the description more in depth.
  #

  spec.name         = 'RNYandexPayment'
  spec.version      = package['version']
  spec.summary      = package['description']
  spec.description  = package['description']
  spec.license = 'MIT'

  spec.homepage     = 'https://github.com/lamantin-group/react-native-yandex-payment'

  spec.author = { 'whalemare' => 'nanostet@gmail.com' }
  spec.social_media_url   = "https://lamantin.group"

  spec.platform = :ios, '9.0'
  spec.swift_version = '5.0'

  spec.ios.deployment_target = '9.0'
  spec.source       = { git: 'https://github.com/lamantin-group/react-native-yandex-payment', tag: spec.version.to_s }

  spec.source_files = 'RNYandexPayment'
  spec.dependency 'React'
  spec.dependency 'YandexCheckoutPayments', '2.2.0'
  # spec.public_header_files = '**/*.h'
end
