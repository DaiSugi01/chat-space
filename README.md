# README

## users table

|Column|Type|Options|notes|
|------|----|-------|-----|
|id|integer|-|Primary key|
|name|varchar(255)|null: false, unique: true|index|
|email|varchar(255)|null: false, unique: true|-|
|password|varchar(255)|null: false|-|

### Association
- has_many :members
- has_many :messages
- has_many :groups through: :member

## messages table

|Column|Type|Options|notes|
|------|----|-------|-----|
|id|integer|-|Primary key|
|body|varchar(255)|-|-|
|image|varchar(255)|-|-|
|user_id|integer|null: false, foreign_key: true|-|
|group_id|integer|null: false, foreign_key: true|-|

### Association
- belongs_to :user
- belongs_to :group
