module Api
  module V1
    class TasksController < ApplicationController
      before_action :set_task, only: %i[ show update destroy ]
      before_action :set_list, only: %i[ index ]

      def index
        # Show all tasks
        @task = @list.tasks.order(updated_at: :desc)
        if @task
          render json: { message: "Tasks Found", data: @task, count: @task.count, list: @list }
        else
          render json: { message: "Tasks not Found", data: @task, count: @task.count }
        end
      end

      # GET /tasks/1
      def show
        if @task
          render json: { message: "Task Found", data: @task }
        else
          render json: { message: "Task not Found", data: @task.errors }
        end
      end

      # POST /tasks
      def create
        @task = Task.new(task_params)

        if @task.save
          render json: { message: "Created task", data: @task }
        else
          render json: { message: "Not Created task", data: @task.errors }
        end
      end

      # PATCH/PUT /tasks/1
      def update
        if @task.update(task_params)
          render json: { message: "Updated task", data: @task }
        else
          render json: { message: "Not Updated task", data: @task.errors }
        end
      end

      # DELETE /tasks/1
      def destroy
        if @task.destroy
          render json: { message: "Task Removed", data: @task }
        else
          render json: { message: "Task not Removed", data: @task.errors }
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_task
          @task = Task.find(params[:id])
        end

        def set_list
          @list = List.find(params[:list_id])
        end

        # Only allow a list of trusted parameters through.
        def task_params
          params.require(:task).permit(:title, :description, :priority, :completed, :date, :time, :list_id)
        end
    end
  end
end
