class Point():
    def __init__(self, x, y, w=0):
        self.x = x
        self.y = y
        self.weight = w

    def __str__(self):
        return f'({self.x}, {self.y})'

    def find_joint(self, another, t):
        joint_x = t * (another.x - self.x) + self.x
        joint_y = t * (another.y - self.y) + self.y
        return Point(joint_x, joint_y)

    def find_t(self, another, joint):
        length_x = another.x - self.x;
        if(not length_x == 0):
            return (joint.x - self.x)/length_x
        length_y = another.y - self.y
        return (joint.y - self.y)/length_y


class Parabola():
    def __init__(self, A, B, C):
        self.control_A = A
        self.control_B = B
        self.control_C = C

    def find_point(self, t):
        E = A.find_joint(B, t)
        Q = B.find_joint(C, t)
        P = E.find_joint(Q, t)
        return P

from fractions import Fraction

class ThreePoint(Parabola):
    def __init__(self, A, B, C):
        super().__init__(A, B, C)

    def mid_point(self):
        total_weight = A.weight + B.weight + C.weight
        print(total_weight)
        mid_x = ((A.weight * A.x) + (B.weight * B.x) + (C.weight * C.x))/total_weight
        mid_y = ((A.weight * A.y) + (B.weight * B.y) + (C.weight * C.y))/total_weight
        return Point(mid_x.as_integer_ratio(), mid_y.as_integer_ratio())


A = Point(-6, 6)
B = Point(6, 4)
C = Point(-8, -8)

# Q = Point(2, 6)
# t = A.find_t(B, Q)
# # t = .4
# parabole = Parabola(A, B, C)
# print(parabole.find_point(t))
A.weight = 3
B.weight = 3
C.weight = 1
threePoint = ThreePoint(A, B, C)
print(threePoint.mid_point())
