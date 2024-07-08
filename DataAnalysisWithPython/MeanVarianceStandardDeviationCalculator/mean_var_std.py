import numpy as np

def calculate(list):
    if len(list) != 9:
        raise ValueError("List must contain nine numbers.")

    matrix = np.array(list).reshape(3, 3)
    
    calculations = {
        "mean": calculate_mean(matrix),
        "variance": calculate_variance(matrix),
        "standard deviation": calculate_std(matrix),
        "max": calculate_max(matrix),
        "min": calculate_min(matrix),
        "sum": calculate_sum(matrix)
    }

    return calculations

def calculate_mean(matrix):
    row_means = matrix.mean(axis=1).tolist()
    col_means = matrix.mean(axis=0).tolist()
    overall_mean = matrix.mean().tolist()
    return [col_means, row_means, overall_mean]

def calculate_variance(matrix):
    row_vars = matrix.var(axis=1).tolist()
    col_vars = matrix.var(axis=0).tolist()
    overall_var = matrix.var().tolist()
    return [col_vars, row_vars, overall_var]

def calculate_std(matrix):
    row_stds = matrix.std(axis=1).tolist()
    col_stds = matrix.std(axis=0).tolist()
    overall_std = matrix.std().tolist()
    return [col_stds, row_stds, overall_std]

def calculate_max(matrix):
    row_maxs = matrix.max(axis=1).tolist()
    col_maxs = matrix.max(axis=0).tolist()
    overall_max = matrix.max().tolist()
    return [col_maxs, row_maxs, overall_max]

def calculate_min(matrix):
    row_mins = matrix.min(axis=1).tolist()
    col_mins = matrix.min(axis=0).tolist()
    overall_min = matrix.min().tolist()
    return [col_mins, row_mins, overall_min]

def calculate_sum(matrix):
    row_sums = matrix.sum(axis=1).tolist()
    col_sums = matrix.sum(axis=0).tolist()
    overall_sum = matrix.sum().tolist()
    return [col_sums, row_sums, overall_sum]