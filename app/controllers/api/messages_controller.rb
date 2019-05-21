class Api::MessagesController < ApplicationController
  def index
    if params[:firstId].nil? && params[:lastId].nil? then
      getMessages('*')
    else
      getMessages(params[:lastId])
    end
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  private 
  
  def getMessages(id)
    @messages = Message.where('id > ?', id).where(group_id: params[:group_id])
  end
end
