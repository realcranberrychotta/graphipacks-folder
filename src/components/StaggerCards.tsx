"use client";

import React, { type ReactNode } from "react";

interface StaggerCardsGridProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function StaggerCardsGrid({
  children,
  className = "",
}: StaggerCardsGridProps) {
  return (
    <div className={className} data-stagger-grid>
      {children}
    </div>
  );
}

interface StaggerCardProps {
  children: ReactNode;
  index?: number;
  staggerMs?: number;
  durationMs?: number;
  className?: string;
}

export function StaggerCard({
  children,
  className = "",
}: StaggerCardProps) {
  return (
    <div className={`h-full ${className}`} data-stagger-card>
      {children}
    </div>
  );
}
