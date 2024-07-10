import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1
df = pd.read_csv('medical_examination.csv')

# 2
df['overweight'] = np.where(df['weight'] / (df['height'] / 100) ** 2 > 25, 1, 0)

# 3
df['cholesterol'] = np.select([df['cholesterol'] == 1, df['cholesterol'] > 1], [0, 1])
df['gluc'] = np.select([df['gluc'] == 1, df['gluc'] > 1], [0, 1])

# 4
def draw_cat_plot():
    # 5
    df_cat = pd.melt(df, id_vars =["cardio"], value_vars = ['cholesterol', 'gluc', 'smoke', 'alco', 'active','overweight'])


    # 6
    df_cat["total"] = 1
    df_cat = df_cat.groupby(["variable", "value", "cardio"], as_index =False).count()
    

    # 7



    # 8
    fig = sns.catplot(x = "variable", y = "total", data = df_cat, hue ="value", kind = "bar", col = "cardio").figure


    # 9
    fig.savefig('catplot.png')
    return fig


# 10
def draw_heat_map():
    # 11
    conditions = (
        (df['ap_lo'] <= df['ap_hi']) &
        (df['height'].between(df['height'].quantile(0.025), df['height'].quantile(0.975))) &
        (df['weight'].between(df['weight'].quantile(0.025), df['weight'].quantile(0.975)))
    )
    df_heat = df[conditions]

    # 12
    corr = df_heat.corr(method = "pearson")

    # 13
    mask = np.triu(corr)



    # 14
    fig, ax = plt.subplots(figsize=(8, 8)) 

    # 15
    sns.heatmap(corr, linewidths=0.5, annot=True, square=True, mask=mask, fmt=".1f", center=0, cbar_kws={"shrink": 0.6}, annot_kws={"fontsize":10}, vmin=-0.2, vmax=1)  


    # 16
    fig.savefig('heatmap.png')
    return fig
