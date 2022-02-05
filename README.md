# wt21-pet-match 



Project Summary - Pet Match

"Pet Match - get matched with the right pet". This is not just our motto, instead, it is our deep belief that we at Pet Match can help to reduce the amount of returned pets to the shelters. For that, we analyzed the present situation which is taking place in many pets shelters nowadays and figured out that following problems.

● Failed adoptions mean pets were adopted and returned.
● People typically return a pet because the pet was not what they expected.
● This is a huge concern for independent shelters that have to allocate resources for that returning pet.
● Pets are usually brought from other countries in Europe, so it’s even harder to return to the original shelter. 
● Failed adoptions can traumatize even animals ● During a lockdown situation, people tend to adopt pets and harm them by returning them after such a lockdown.

We at Pet Match are convinced that by analyzing the traits of a potential adopter and the behavior/characteristics of a pet, we can ensure a better matching by giving the potential adopter a recommendation based on a machine learning model which will be deployed on a webpage.

##  MY role 
as a part of myTechlabs 2021 graduation project, My role was desiging the logic and the recommmender system (based on double User_based collabortive filtering)


### idea 
user input his(personality test answers)and the system recommeds his matching Cats 


### metodology 
since our users don't have any prior preferences towards Cats(user cold start problem) we have to start with this:

1. Finding **nearset user**: the system takes user input (personality test answers) then finds the nearsest user (the most similar one) from our DataSet
    - for better pridections : we filterd out users with staisfacton level blow 0.8 

2. we get the nearest user - **Connceted Cat** (from the DataSet)

3. based on the **Connceted Cat** the system recommends the nearset cat from an external data set "Cat_dataset_online"


some notes: 

- there isn't any active learning,the system just recommends based on the Dataset (aka. the scale where every user get his recommended cat)  
- due to the DataSet setup, each user is exposed to one and only one Cat (Aka. each user rates one Cat). so we are forced to use "**user_based** collaborative filtering", in Addition satisfaction here is based on live -interaction between the Adopter and the cat for some time, so the satisfaction is a reliable scale 

for more info.please read the blog (https://github.com/Hany-mohsen-elhassany/wt21-pet-match/blob/main/Blog%20Post%20-%20Pet%20Match.md)

## refrences 
The data set is acquired from the following open access publication.
#### Finka LR, Ward J, Farnworth MJ, Mills DS (2019) Owner personality and the wellbeing of their cats share parallels with the parent-child relationship. PLOS ONE 14(2): e0211862. https://doi.org/10.1371/journal.pone.0211862
