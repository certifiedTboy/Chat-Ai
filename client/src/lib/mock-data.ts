export const MOCK_RESPONSES = [
  `Here is a basic React component using Tailwind CSS:

\`\`\`jsx
import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {children}
    </button>
  );
}
\`\`\`

You can use this component anywhere in your app. The \`transition-colors\` utility makes the hover effect smooth.`,
  `To explain quantum computing in simple terms:

Imagine a coin. In traditional computing, a bit is like a coin sitting on a table—it's either heads (1) or tails (0).

In **quantum computing**, a *qubit* is like a coin spinning in the air. While it's spinning, it exists in a state of both heads and tails simultaneously. This is called **superposition**.

### Key Concepts:
1. **Superposition**: Being in multiple states at once.
2. **Entanglement**: Two qubits becoming linked, so the state of one instantly affects the other, no matter how far apart they are.

This allows quantum computers to process massive amounts of possibilities simultaneously, making them incredibly powerful for specific types of problems like cryptography or molecular simulation.`,
  `Here are three healthy dinner recipes you can make in under 30 minutes:

### 1. Lemon Herb Salmon with Asparagus
* **Ingredients**: Salmon fillets, asparagus, olive oil, lemon, garlic, herbs.
* **Prep**: Toss asparagus in olive oil. Season salmon. Bake at 400°F (200°C) for 12-15 mins.

### 2. Quinoa Black Bean Bowl
* **Ingredients**: Cooked quinoa, black beans, corn, bell peppers, avocado, lime dressing.
* **Prep**: Combine all ingredients in a bowl. Top with cilantro and a squeeze of lime.

### 3. Veggie Stir-Fry with Tofu
* **Ingredients**: Firm tofu, broccoli, snap peas, carrots, soy sauce, sesame oil.
* **Prep**: Pan-fry tofu cubes until crispy. Add veggies and stir-fry sauce. Serve over brown rice.

Let me know if you want the full instructions for any of these!`,
  `Certainly! Here's a Python script using \`BeautifulSoup\` and \`requests\` to scrape a basic website:

\`\`\`python
import requests
from bs4 import BeautifulSoup

def scrape_titles(url):
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all h2 tags (adjust based on the site's structure)
        titles = soup.find_all('h2')
        
        for index, title in enumerate(titles, 1):
            print(f"{index}. {title.get_text(strip=True)}")
    else:
        print(f"Failed to retrieve page: Status {response.status_code}")

# Example usage
scrape_titles('https://example.com/blog')
\`\`\`

Make sure to install the required packages first:
\`\`\`bash
pip install requests beautifulsoup4
\`\`\`

**Note**: Always check a website's \`robots.txt\` file before scraping to ensure you're allowed to extract data from it.`,
];
