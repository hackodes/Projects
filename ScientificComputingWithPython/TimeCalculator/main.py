def add_time(start, duration, day_of_week=None):
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    start_time, period = start.split()
    start_hour, start_minute = map(int, start_time.split(':'))
    
    if period == "PM" and start_hour != 12:
        start_hour += 12
    elif period == "AM" and start_hour == 12:
        start_hour = 0
    
    duration_hours, duration_minutes = map(int, duration.split(':'))
    end_hour = start_hour + duration_hours
    end_minute = start_minute + duration_minutes
    
    if end_minute >= 60:
        end_minute -= 60
        end_hour += 1
    
    days_later = 0
    if end_hour >= 24:
        days_later = end_hour // 24
        end_hour %= 24
    
    if end_hour >= 12:
        period = "PM"
        if end_hour > 12:
            end_hour -= 12
    else:
        period = "AM"
        if end_hour == 0:
            end_hour = 12
    
    new_time = f"{end_hour}:{end_minute:02d} {period}"
    
    if day_of_week:
        day_of_week = day_of_week.capitalize()
        if day_of_week in days_of_week:
            start_day_index = days_of_week.index(day_of_week)
            end_day_index = (start_day_index + days_later) % 7
            new_day_of_week = days_of_week[end_day_index]
            new_time += f", {new_day_of_week}"
    
    if days_later == 1:
        new_time += " (next day)"
    elif days_later > 1:
        new_time += f" ({days_later} days later)"
    
    return new_time

add_time('3:00 PM', '3:10')
# Returns: 6:10 PM

add_time('11:30 AM', '2:32', 'Monday')
# Returns: 2:02 PM, Monday

add_time('11:43 AM', '00:20')
# Returns: 12:03 PM

add_time('10:10 PM', '3:30')
# Returns: 1:40 AM (next day)

add_time('11:43 PM', '24:20', 'tueSday')
# Returns: 12:03 AM, Thursday (2 days later)

add_time('6:30 PM', '205:12')
# Returns: 7:42 AM (9 days later)