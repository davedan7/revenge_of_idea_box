class IdeasController < ApplicationController
  respond_to :json

  def index
    @ideas = Idea.all
  end

  def create
    idea = Idea.new(idea_params)
    if idea.save
      respond_with(idea)
    else
      respond_with({:errors => idea.errors }, :status => 422, :location => ideas_path)
    end
  end

  def edit
  end

  def update
    idea = Idea.find(params[:id].to_i)
    # binding.pry
    idea.title = params[:title]
    idea.body = params[:body]

    if idea.save
      respond_with idea, location: ""
    else
      respond_with({:errors => idea.errors }, :status => 422, :location => ideas_path)
    end
  end

  def like
    @idea = Idea.find(params[:id].to_i)
    case @idea.quality
    when "Swill"
      @idea.quality = "Plausible"
    when "Plausible"
      @idea.quality = "Genius"
    end

    if @idea.save
      respond_with @idea, location: ""
    else
      respond_with({:errors => @idea.errors }, :status => 422, :location => ideas_path)
    end
  end

  def dislike
    @idea = Idea.find(params[:id].to_i)
    case @idea.quality
    when "Genius"
      @idea.quality = "Plausible"
      # @idea.save!
    when "Plausible"
      @idea.quality = "Swill"
      # @idea.save!
    end

    if @idea.save
      respond_with @idea, location: ""
    else
      respond_with({:errors => @idea.errors }, :status => 422, :location => ideas_path)
    end
  end

  def destroy
    # binding.pry
    @idea = Idea.find(params[:id].to_i)
    respond_with @idea , location: ""
    @idea.destroy!
  end


  private

    def idea_params
      params.require(:idea).permit(:title, :body, :quality)
    end

end

  # def create
  #   @idea = Idea.new(idea_params)
  #   if @idea.save
  #     redirect_to root_path
  #   else
  #     render :new
  #   end
  # end

