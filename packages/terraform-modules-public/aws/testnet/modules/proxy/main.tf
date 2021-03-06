module "ami" {
  source = "../ami"
}

resource "aws_instance" "celo_proxy" {
  for_each = var.proxies

  ami                    = module.ami.ami_ids.ubuntu_18_04
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [var.security_group_id]
  key_name               = var.key_pair_name
  iam_instance_profile   = var.iam_instance_profile

  root_block_device {
    volume_size = var.volume_size
  }

  user_data = join("\n", [
    file("${path.module}/../startup-scripts/install-base.sh"),
    var.cloudwatch_collect_disk_and_memory_usage ? file("${path.module}/../startup-scripts/install-cloudwatch-agent.sh") : "",
    file("${path.module}/../startup-scripts/install-docker.sh"),
    file("${path.module}/../startup-scripts/install-chrony.sh"),
    templatefile("${path.module}/../startup-scripts/run-proxy-node.sh", {
      celo_image                      = var.celo_image
      celo_network_id                 = var.celo_network_id
      ethstats_host                   = var.ethstats_host
      validator_name                  = each.value.validator_name
      validator_signer_address        = each.value.validator_signer_address
      proxy_address                   = each.value.proxy_address
      proxy_private_key_filename      = each.value.proxy_private_key_filename
      proxy_private_key_file_contents = each.value.proxy_private_key_file_contents
      proxy_private_key_password      = each.value.proxy_private_key_password
      proxy_node_private_key          = each.value.proxy_node_private_key
      cloudwatch_log_group_name       = var.cloudwatch_log_group_name
      cloudwatch_log_stream_name      = "celo_proxy_${each.key}"
    }),
    file("${path.module}/../startup-scripts/final-hardening.sh")
  ])

  tags = {
    Name = "celo-proxy-${each.value.validator_name}"
  }

  lifecycle {
    ignore_changes = [
      ami,
      user_data
    ]
  }
}

resource "aws_eip" "celo_proxy" {
  for_each = var.proxies

  instance = aws_instance.celo_proxy[each.key].id
  vpc      = true
}