

import bcrypt
from string import (
    digits,
    ascii_letters
)

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password=password.encode(), salt=salt)
    return hashed.decode()


def check_password(hashed_password: str, password: str) -> bool:
    return bcrypt.checkpw(
        password=password.encode(),
        hashed_password=hashed_password.encode()
    )

alphabet = ascii_letters + digits

def _to_base62(number: int) -> str:
    array = []
    for i in range(8):
        number, mod = divmod(number, 62)
        array.append(alphabet[mod])

    return ''.join(list(reversed(array)))


def _permutate(number: int) -> int:
    n = 62 ** 8
    a = 1234567890123  # must not share factors with n
    b = 987654321

    return (number * a + b ) % n


def id_to_link(link_id: int) -> str:
    permutation = _permutate(link_id)
    base_62 = _to_base62(permutation)
    return base_62


if __name__ == "__main__":
    print(id_to_link(0))
    print(id_to_link(1))
    print(id_to_link(2))
