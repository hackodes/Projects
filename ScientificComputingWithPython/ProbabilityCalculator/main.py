import copy
import random

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for color, count in kwargs.items():
            self.contents.extend([color] * count)

    def __str__(self):
        return ', '.join(self.contents)

    def draw(self, number):
        if number >= len(self.contents):
            drawn_balls = self.contents.copy()
            self.contents.clear()
            return drawn_balls

        number = min(number, len(self.contents))
        drawn_balls = random.sample(self.contents, number)

        for ball in drawn_balls:
            self.contents.remove(ball)
        return drawn_balls

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success_count = 0
    
    for _ in range(num_experiments):
        hat_copy = copy.deepcopy(hat)
        drawn_balls = hat_copy.draw(num_balls_drawn)
        
        drawn_counts = {color: drawn_balls.count(color) for color in set(drawn_balls)}
        expected_counts = copy.deepcopy(expected_balls)
        
        if all(drawn_counts.get(color, 0) >= count for color, count in expected_counts.items()):
            success_count += 1

    return success_count / num_experiments


hat = Hat(black=6, red=4, green=3)
probability = experiment(hat=hat,
                  expected_balls={'red':2,'green':1},
                  num_balls_drawn=5,
                  num_experiments=2000)
print(probability)