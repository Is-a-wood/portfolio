#!/bin/bash
# Deploy Bella Wood Portfolio to AWS S3 + CloudFront
# Usage: bash deploy.sh

echo "Syncing files to S3..."
aws s3 sync . s3://bellawood-portfolio \
  --exclude ".git/*" \
  --exclude ".vscode/*" \
  --exclude ".claude/*" \
  --exclude "cf-config.json" \
  --exclude "deploy.sh" \
  --exclude ".gitignore" \
  --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E161TRPGE5N4VR \
  --paths "/*"

echo "Done! Your site will be updated in a few minutes."
