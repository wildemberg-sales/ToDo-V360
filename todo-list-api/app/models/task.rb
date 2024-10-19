class Task < ApplicationRecord
  validates :title, presence: true
  validates :priority, presence: true

  belongs_to :list
end
