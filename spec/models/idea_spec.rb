require 'rails_helper'

RSpec.describe 'idea' do

  context 'When name is missing' do
    let (:idea) { Idea.create(title: "", body: "Great idea!", quality: 1) }

    it 'should require a title' do
      expect(idea).not_to be_valid
    end

  end

  context 'When body is missing' do
    let (:idea) { Idea.create(title: "My Idea", body: "", quality: 1) }

    it 'should require a body' do
      expect(idea).not_to be_valid
    end
    
  end

  # Default role?
  # context 'When role is missing' do
  #   let (:idea) { Idea.create(title: "", body: "Great idea!", quality: 1) }

  #   it 'should require a title' do
  #     expect(idea).not_to be_valid
  #   end
    
  # end

end
