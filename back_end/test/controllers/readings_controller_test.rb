require 'test_helper'

class ReadingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reading = readings(:one)
  end

  test "should get index" do
    get readings_url, as: :json
    assert_response :success
  end

  test "should create reading" do
    assert_difference('Reading.count') do
      post readings_url, params: { reading: { color: @reading.color, compatibility: @reading.compatibility, description: @reading.description, lucky_number: @reading.lucky_number, lucky_time: @reading.lucky_time, mood: @reading.mood, user_id: @reading.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show reading" do
    get reading_url(@reading), as: :json
    assert_response :success
  end

  test "should update reading" do
    patch reading_url(@reading), params: { reading: { color: @reading.color, compatibility: @reading.compatibility, description: @reading.description, lucky_number: @reading.lucky_number, lucky_time: @reading.lucky_time, mood: @reading.mood, user_id: @reading.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy reading" do
    assert_difference('Reading.count', -1) do
      delete reading_url(@reading), as: :json
    end

    assert_response 204
  end
end
