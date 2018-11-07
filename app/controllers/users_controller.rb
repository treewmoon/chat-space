class UsersController < ApplicationController
  def edit
  end

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.html
      format.json
  end
end

# current_user.updateに成功 → rootにリダイレクト
# 失敗 → editのビューを再度描画
  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
