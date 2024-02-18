import json
from typing import Dict
import numpy as np
from scipy.optimize import linear_sum_assignment

# Open the JSON file
with open("top_restaurants.json", 'r') as json_file:
    # Load JSON data into a Python dictionary
    top_restaurants = json.load(json_file)


with open("user_data.json", 'r') as json_file:
    # Load JSON data into a Python dictionary
    user_data: Dict[str, Dict] = json.load(json_file)

# assume user_data is a nested dictionary with keys being user emails, 
# and user_data[email] being another dictionary of user responses

#create a matrix compat where compatibilities[i][j] represents the compatibility between userid[i] and userid[j]
#where userid[i] gives the ith email.

userid: list[str]=[]
for email in user_data:
    userid.append(email)

compatibilities=np.zeros((len(userid), len(userid)))
love_mask = np.zeros((len(userid),len(userid)))
friend_mask = np.zeros((len(userid),len(userid)))
loveable: set[str]={"Love and Friendship","Love"}
friendable:set[str]={"Love and Friendship","Friendship"}
gendermap: dict[str, int]={"Male":0, "Female":1, "Nonbinary":2}
prefmap: dict[str, set[int]]={
                  "Men": {0},
                  "Women": {1},
                  "Men & women": {0,1},
                  "Nonbinary-people":{2},
                  "Nonbinary & men":{0,2},
                  "Nonbinary & women":{1,2},
                  "People of all genders":{0,1,2},
                  "Only looking for friends":{},
}
for i in range(len(userid)):
    user1: Dict=user_data[userid[i]]
    user1love: int=1 if user1["lookingFor"] in loveable else 0
    user1gender=gendermap[user1["gender"]]
    user1pref=prefmap[user1["loveMatch"]]
    for j in range(i):
        #love compatibility:
        user2: Dict=user_data[userid[j]]
        user2love: int=1 if user2["lookingFor"] in loveable else 0
        user2gender=gendermap[user2["gender"]]
        user2pref=prefmap[user2["loveMatch"]]

        if(user1love*user2love==1 and (user2gender in user1pref) and (user1gender in user2pref)):
            love_mask[i,j]=1
            love_mask[j,i]=1

        #friendship:
        if(user1["lookingFor"] in friendable and user2["lookingFor"] in friendable):
            friend_mask[i,j]=1
            friend_mask[j,i]=1
        
        #matching answers for optional questions
        compat=1
        for question in ["buffet", "cheese", "cuisine", "first"]:
            if(user1[question]==user2[question]):
                compat+=1

        #use Beli data 
        #TODO

        #Compatibility score:
        compatibilities[i,j]=compat
        compatibilities[j,i]=compatibilities[i,j]

love_compatibilities=love_mask*compatibilities
friend_compatibilities=friend_mask*compatibilities
love_rows, love_cols = linear_sum_assignment(love_compatibilities, maximize=True)
friend_rows, friend_cols=linear_sum_assignment(friend_compatibilities,maximize=True)
print(love_mask)
print(compatibilities)
print("Love matches")
for row, col in zip(love_rows, love_cols):
    print(f"Matched pair: ({userid[row]}, {userid[col]}) with weight {love_compatibilities[row, col]}")
print("Friendship matches")
for row, col in zip(friend_rows, friend_cols):
    print(f"Matched pair: ({userid[row]}, {userid[col]}) with weight {friend_compatibilities[row, col]}")
