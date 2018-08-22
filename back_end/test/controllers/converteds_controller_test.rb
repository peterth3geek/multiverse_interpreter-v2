require 'test_helper'

class ConvertedsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @converted = converteds(:one)
  end

  test "should get index" do
    get converteds_url, as: :json
    assert_response :success
  end

  test "should create converted" do
    assert_difference('Converted.count') do
      post converteds_url, params: { converted: { compatibility: @converted.compatibility, description: @converted.description, gif_url: @converted.gif_url, team: @converted.team, time_warning: @converted.time_warning, universe_id: @converted.universe_id, user_id: @converted.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show converted" do
    get converted_url(@converted), as: :json
    assert_response :success
  end

  test "should update converted" do
    patch converted_url(@converted), params: { converted: { compatibility: @converted.compatibility, description: @converted.description, gif_url: @converted.gif_url, team: @converted.team, time_warning: @converted.time_warning, universe_id: @converted.universe_id, user_id: @converted.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy converted" do
    assert_difference('Converted.count', -1) do
      delete converted_url(@converted), as: :json
    end

    assert_response 204
  end
end
