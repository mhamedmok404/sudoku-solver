from solver import rechercher
from solver import completer_grille
grille=[[0,0,-6,-4,-5,-8,0,0,-9],
        [-8,0,0,0,0,-7,-4,-3,-2],
        [-4,0,0,0,-2,0,-5,0,-8],
        [0,-6,-3,0,-4,-5,-2,0,0],
        [0,0,-5,-2,0,0,-3,-7,-4],
        [0,0,0,0,-7,-3,0,0,0],
        [-1,-4,0,-5,0,0,-6,0,-3],
        [0,-3,0,-6,0,-4,0,0,-7],
        [-6,-9,0,-7,0,0,0,-4,-5 ]
        ]
grille_c=completer_grille(grille)
solution, score = rechercher(grille_c)
print("score==", score)
