-- Migration: Make GitHub profile field optional
-- This migration makes the github_profile column nullable

ALTER TABLE applications ALTER COLUMN github_profile DROP NOT NULL; 