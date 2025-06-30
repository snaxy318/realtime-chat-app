provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "chat_app_instance" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name
  security_groups = [aws_security_group.chat_sg.name]

  tags = {
    Name = "chat-app-ec2"
  }

  user_data = file("user-data.sh") # optional: to run scripts on launch
}

output "instance_public_ip" {
  value = aws_instance.chat_app_instance.public_ip
}


resource "aws_security_group" "chat_sg" {
  name        = "chat-app-sg"
  description = "Allow ports for chat app"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # SSH
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # HTTP
  }

  ingress {
    from_port   = 3000
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Socket or frontend
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Backend
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
