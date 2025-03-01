import os
import kaggle.api as kaggle_api
from kaggle.api.kaggle_api_extended import KaggleApi
from dotenv import load_dotenv

load_dotenv()

def get_kaggle_datasets(query: str):
    try:
        # Get credentials from environment variables
        KAGGLE_USERNAME = os.getenv("KAGGLE_USERNAME")
        KAGGLE_KEY= os.getenv("KAGGLE_KEY")

        # Authenticate Kaggle API
        api = KaggleApi()
        api.authenticate()

        api.config_values['username'] = KAGGLE_USERNAME
        api.config_values['key'] = KAGGLE_KEY

        # Fetch datasets
        datasets = api.dataset_list(search=query)

        # Extract relevant dataset details
        dataset_list = []
        for dataset in datasets[:10]:  # Limit to 10 datasets
            dataset_info = {
                "ref": getattr(dataset, "ref", "Unknown"),
                "title": getattr(dataset, "title", "Unknown"),
                "size": getattr(dataset, "size", "Unknown"),
                "last_updated": getattr(dataset, "lastUpdated", "Unknown"),
                "download_count": getattr(dataset, "downloadCount", "Unknown"),
                "vote_count": getattr(dataset, "voteCount", "Unknown"),
                "usability_rating": getattr(dataset, "usabilityRating", "Unknown"),
            }
            dataset_list.append(dataset_info)

        return {"datasets": dataset_list}

    except Exception as e:
        return {"datasets": [f"Error fetching datasets: {str(e)}"]}
