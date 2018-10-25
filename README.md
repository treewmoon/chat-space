# ChatSpaceのDB設計をしよう

## 1.usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string|null: false, unique: true|
|e-mail|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :mambers

## 2.messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## 3.groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :mambers

## 4.membersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
