variable "aws_region" {
  description = "The AWS region to deploy in"
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID for EC2 instance"
  type = string
}

variable "instance_type" {
  description = "Instance type"
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of the AWS Key Pair"
  type = string
}
