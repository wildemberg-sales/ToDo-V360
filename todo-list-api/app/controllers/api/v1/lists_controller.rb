module Api
  module V1
    class ListsController < ApplicationController
      before_action :set_list, only: %i[ show update destroy ]

      # GET    /api/v1/lists
      def index
        # Show all Lists
        @list = List.all.order(created_at: :asc)
        if @list
          render json: { message: "Lists Found", data: @list, count: @list.count }
        else
          render json: { message: "Lists not Found", data: @list }
        end
      end

      # POST   /api/v1/list
      def create
        # Create single list
        @list = List.new(lists_params)
        if @list.save
          render json: { message: "Created List", data: @list }
        else
          render json: { message: "Not Created List", data: @list.errors }
        end
      end

      # GET    /api/v1/lists/:id
      def show
        # Show single list
        if @list
          render json: { message: "List Found", data: @list }
        else
          render json: { message: "List not Found", data: @list.errors }
        end
      end

      # PATCH/PUT  /api/v1/lists/:id
      def update
        # update single list
        if @list.update(lists_params)
          render json: { message: "List Updated", data: @list }
        else
          render json: { message: "List not Updated", data: @list.errors }
        end
      end

      # DELETE /api/v1/lists/:id
      def destroy
        # Delete single list
        if @list.destroy
          render json: { message: "List Removed", data: @list }
        else
          render json: { message: "List not Removed", data: @list.errors }
        end
      end

      private
      def set_list
        @list = List.find(params[:id])
      end

      def lists_params
        params.require(:list).permit(:title, :description)
      end
    end
  end
end
