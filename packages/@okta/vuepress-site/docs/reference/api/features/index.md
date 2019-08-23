---
title: Factors
category: management
---

# Features API

## Feature Operations

### Get a list of self-service features

<ApiOperation method="get" url="/api/v1/features" />

### Get a self-service feature

<ApiOperation method="get" url="/api/v1/features/${featureId}" />

### Get all dependencies for a feature

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependencies" />

### Get all dependents for a feature

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependents" />

### Update status of a feature

<ApiOperation method="post" url="/api/v1/features/${featureId}/{lifecycle}" />
