This project is a full-stack data analysis application designed to uncover trends and patterns in viral YouTube content across various categories (e.g., Gaming, Tech, Cooking). 
The goal is to provide data-driven insights to content creators, specifically focusing on how video length correlates with the likelihood of achieving high engagement.
The project encompasses a complete workflow, from data acquisition and feature engineering in Python to a live, interactive dashboard built with React.

🔑 Key Features & Technical StackData Source: YouTube API (for video metadata, views, likes, and publish time).
- Feature Engineering: Calculated a proprietary Virality Score ($S_{Viral}$) for each video to quantify engagement potential over time.$S_{Viral}$ is based on a weighted combination of total views, total likes, and the time elapsed since the video was published.
- Analysis & Visualization: Data processed using Python (Colab environment) and visualized via a dashboard.Dashboard: Built with React and Chart.js, offering interactive scatter plots and summaries that map video length (x-axis) against the calculated Virality Score (y-axis).Deployment: Continuous integration and deployment via Netlify and GitHub.
- The Python Code can be provided upon request! However feel free to create your own Python Script and use your own methods of gathering the data (though I highly recommend YOUTUBE DATA API V3).

  
- 📈 The Virality Score
- The core of this project is the engineered Virality Score. This metric allows for a direct comparison of a video's success regardless of its age, rewarding videos that achieve high engagement quickly.

⚠️ Project Limitation (The Unaccounted Factor)
It is important to note that the current Virality Score measures intrinsic performance but does not account for extrinsic factors.

The analysis does not differentiate between videos that went viral organically versus those that went viral due to a large, pre-existing subscriber base or extensive external marketing (e.g., promotion on Instagram or TV).

Therefore, the correlation between optimal video length and virality may be heavily influenced by videos from established creators, which inherently start with higher views. Future work will focus on normalizing this score to account for creator fame.
