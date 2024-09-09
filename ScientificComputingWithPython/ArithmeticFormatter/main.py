def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return "Error: Too many problems."

    first_line = []
    second_line = []
    dash_line = []
    answer_line = []

    for problem in problems:
        components = problem.split()
        if len(components) != 3:
            return "Error: Invalid problem format."

        first_number, operator, second_number = components

        if operator not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."
        if not (first_number.isdigit() and second_number.isdigit()):
            return "Error: Numbers must only contain digits."
        if len(first_number) > 4 or len(second_number) > 4:
            return "Error: Numbers cannot be more than four digits."

        if operator == '+':
            result = str(int(first_number) + int(second_number))
        else:
            result = str(int(first_number) - int(second_number))

        width = max(len(first_number), len(second_number)) + 2

        first_line.append(first_number.rjust(width))
        second_line.append(operator + second_number.rjust(width - 1))
        dash_line.append('-' * width)
        answer_line.append(result.rjust(width))

    if show_answers:
        arranged_problems = (
            '    '.join(first_line) + '\n' +
            '    '.join(second_line) + '\n' +
            '    '.join(dash_line) + '\n' +
            '    '.join(answer_line)
        )
    else:
        arranged_problems = (
            '    '.join(first_line) + '\n' +
            '    '.join(second_line) + '\n' +
            '    '.join(dash_line)
        )

    return arranged_problems

print(arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"], show_answers=True))
