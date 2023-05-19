import pandas as pd
import string

data = 'Airline Code;DelayTimes;FlightCodes;To_From\nAir Canada (!);[21, 40];20015.0;WAterLoo_NEWYork\n<Air France> (12);[];;Montreal_TORONTO\n(Porter Airways. );[60, 22, 87];20035.0;CALgary_Ottawa\n12. Air France;[78, 66];;Ottawa_VANcouvER\n""".\\.Lufthansa.\\.""";[12, 33];20055.0;london_MONTreal\n'

def whatever():
    rows = data.split('\n')
    headers = rows[0].replace('_', ';').split(';')

    new_data = {}
    for header in headers: 
        new_data[header] = []
        
    flight_code = 0

    for row in rows[1:]:
        new_row = row.replace('_', ';').split(';')
        if row == '': 
            continue
        for i, r in enumerate(new_row):
            if i == 0: 
                r = r.translate(r.maketrans('', '', string.punctuation))
                if r == '':
                    continue 
                if r[-1] == ' ': 
                    r = r[:-1]
            elif i == 2: 
                if r == '':
                    flight_code += + 10
                    r = flight_code
                else: 
                    r = int(float(r))
                    flight_code = r
            else: 
                r = r.upper()
            new_data[headers[i]].append(r)   

    df = pd.DataFrame(new_data)
    print(df) 

    # Output:
    #      Airline Code    DelayTimes  FlightCodes        To       From
    # 0      Air Canada      [21, 40]        20015  WATERLOO    NEWYORK
    # 1   Air France 12            []        20025  MONTREAL    TORONTO
    # 2  Porter Airways  [60, 22, 87]        20035   CALGARY     OTTAWA
    # 3   12 Air France      [78, 66]        20045    OTTAWA  VANCOUVER
    # 4       Lufthansa      [12, 33]        20055    LONDON   MONTREAL

if __name__ == "__main__":
    whatever()