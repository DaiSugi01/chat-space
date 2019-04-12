# README

## users table

|Column|Type|Options|notes|
|------|----|-------|-----|
|id|integer|-|Primary key|
|name|varchar(255)|index:true, null: false, unique: true|
|email|varchar(255)|null: false, unique: true|
|password|varchar(255)|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :groups through: :member
