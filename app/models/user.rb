class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :members
  has_many :messages
  has_many :groups, through: :members
end
