# Docker Image Name
IMAGE_NAME = wtm-2026
CONTAINER_NAME = wtm-container
PORT = 3000

# Colors
GREEN = \033[0;32m
NC = \033[0m # No Color

.PHONY: all build run stop clean rebuild

all: build run

# --- Production Commands (Static Build + Nginx) ---
build:
	@echo "$(GREEN)Building Production Image...$(NC)"
	docker build -t $(IMAGE_NAME) .

run:
	@echo "$(GREEN)Starting Production Container on http://localhost:$(PORT)...$(NC)"
	docker run -p $(PORT):80 --name $(CONTAINER_NAME) -d $(IMAGE_NAME)

stop:
	@echo "$(GREEN)Stopping Production Container...$(NC)"
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)

clean: stop
	@echo "$(GREEN)Removing image...$(NC)"
	-docker rmi $(IMAGE_NAME)

rebuild: stop build run
	@echo "$(GREEN)Rebuild complete! App running on http://localhost:$(PORT)$(NC)"

logs:
	docker logs -f $(CONTAINER_NAME)
