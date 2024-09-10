class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def __str__(self):
        title = f"{self.name:*^30}\n"
        items = ""

        for entry in self.ledger:
            description = entry['description'][:23] 
            amount = f"{entry['amount']:.2f}"  
            items += f"{description:<23}{amount:>7}\n"  
        
        total = self.get_balance()
        return title + items + f"Total: {total:.2f}"

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        return sum(item['amount'] for item in self.ledger)

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return amount <= self.get_balance()

def create_spend_chart(categories):
    total_spent = []
    for category in categories:
        spent = sum(abs(item['amount']) for item in category.ledger if item['amount'] < 0)
        total_spent.append((category.name, round(spent, 2)))

    total = sum(spent for _, spent in total_spent)

    percentages = [(name, int((spent / total) * 100)) for name, spent in total_spent]

    chart_output = "Percentage spent by category\n"
    for i in range(100, -1, -10):
        chart_output += f"{i:>3}| "  
        for _, percent in percentages:
            chart_output += "o  " if percent >= i else "   "
        chart_output += "\n"

    chart_output += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    max_name_length = max(len(name) for name, _ in total_spent)
    for i in range(max_name_length):
        chart_output += "     " 
        for name, _ in total_spent:
            chart_output += (name[i] + "  ") if i < len(name) else "   "
        if i < max_name_length - 1:
            chart_output += "\n"

    return chart_output

food = Category('Food')
food.deposit(1000, 'deposit')
food.withdraw(10.15, 'groceries')
food.withdraw(15.89, 'restaurant and more food for dessert')
clothing = Category('Clothing')
food.transfer(50, clothing)
print(food)