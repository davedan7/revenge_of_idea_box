class Idea < ActiveRecord::Base
  validates :title, presence: true 
  validates :body, presence: true 

  enum quality: %w(Swill Plausible Genius)

  default_scope -> { order('created_at DESC')}

  def like
    self[:quality] += 1 unless self[:quality] == 2
  end

  def dislike
    self[:quality] -= 1 unless self[:quality] == 0
  end
  
end
