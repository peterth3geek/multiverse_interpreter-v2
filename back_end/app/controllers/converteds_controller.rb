class ConvertedsController < ApplicationController
  before_action :set_converted, only: [:show, :update, :destroy]

  # GET /converteds
  def index
    @converteds = Converted.all

    render json: @converteds
  end

  # GET /converteds/1
  def show
    render json: @converted
  end

  # POST /converteds
  def create
    address_number = converted_params["universe_id"]
    address_street = Faker::RickAndMorty.location
    address_suffix = Faker::Address.street_suffix
    address_city = Faker::Zelda.location
    address_country = Faker::LordOfTheRings.location
    address_zip = Faker::Number.number(5)
    address_planet = Faker::HitchhikersGuideToTheGalaxy.planet
    address = "#{address_number} #{address_street} #{address_suffix}<br>#{address_city}, #{address_country} #{address_zip}<br>Planet #{address_planet}"

    @converted = Converted.new(converted_params)
    @converted.universe_id = address

    if @converted.save
      render json: @converted, status: :created, location: @converted
    else
      render json: @converted.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /converteds/1
  def update
    if @converted.update(converted_params)
      render json: @converted
    else
      render json: @converted.errors, status: :unprocessable_entity
    end
  end

  # DELETE /converteds/1
  def destroy
    @converted.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_converted
      @converted = Converted.find(params[:id])
    end

    # def new_team_assignment
    #   self.teamAssignment
    # end

    # Only allow a trusted parameter "white list" through.
    def converted_params
      c_params = params.require(:converted).permit(:gif_url, :team, :universe_id, :time_warning, :compatibility, :user_id, :description)
      c_params[:team] = c_params[:team].to_i
      c_params

    end
end
