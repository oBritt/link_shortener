
from pydantic import BaseModel, HttpUrl, SecretStr, field_validator
from typing import Optional
import string

class ShortenerRequest(BaseModel):
    url: HttpUrl
    password: Optional[SecretStr] = None


    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if v is None:
            return v

        password = v.get_secret_value()

        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")

        if not any(char in string.ascii_uppercase for char in password):
            raise ValueError("Password must contain an uppercase letter")

        if not any(char in string.ascii_lowercase for char in password):
            raise ValueError("Password must contain a lowercase letter")

        if not any(char in string.digits for char in password):
            raise ValueError("Password must contain a number")

        if not any(char in string.punctuation for char in password):
            raise ValueError("Password must contain a special character")

        return v


class ShortenerResponse(BaseModel):
    ending: str

    @field_validator("ending")
    @classmethod
    def validate_password(cls, v):

        if len(v) != 8:
            raise ValueError("Length must be 8 characters")

        if not all(char in string.ascii_lowercase or char in string.digits for char in v):
            raise ValueError("Password must contain an lowercase letter or digits")

        return v

if __name__ == "__main__":
    a = ShortenerRequest(
        url="https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank/description/",
        password=None
    )

    b = ShortenerResponse(
        ending="1234678A"
    )

class StatsResponse(BaseModel):
    clicks: int    