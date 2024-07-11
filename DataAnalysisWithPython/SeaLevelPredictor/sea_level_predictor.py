import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')
    xAxis = df['Year']
    yAxis = df['CSIRO Adjusted Sea Level']

    # Create scatter plot
    fig, ax = plt.subplots()
    plt.scatter(xAxis, yAxis)

    # Create first line of best fit
    slope, intercept, r_value, p_value, std_err = linregress(xAxis, yAxis)
    x = range(1880, 2051)
    y = slope*x + intercept
    plt.plot(x, y, 'r', label='fitted line')

    # Create second line of best fit
    df_2000 = df[df['Year'] >= 2000]
    xAxis_2000 = df_2000['Year']
    yAxis_2000 = df_2000['CSIRO Adjusted Sea Level']
    slope_2000, intercept_2000, r_value_2000, p_value_2000, std_err_2000 = linregress(xAxis_2000, yAxis_2000)
    x_2000 = range(2000, 2051)
    y_2000 = slope_2000*x_2000 + intercept_2000
    plt.plot(x_2000, y_2000, 'g', label='fitted line after 2000')

    # Add labels and title
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')
    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()