import hashlib

def read_file_contents(file):
    with open(file) as file:
        file_contents = file.readlines()
        file_contents = [line.strip() for line in file_contents]
    return file_contents

def crack_sha1_hash(hash, use_salts = False):
    passwords = read_file_contents("top-10000-passwords.txt")
    if use_salts:
        salts = read_file_contents("known-salts.txt")
        for password in passwords:
            for salt in salts:
                hashed_password = hashlib.sha1((salt + password).encode()).hexdigest()
                if hashed_password == hash:
                    return password

                hashed_password = hashlib.sha1((password + salt).encode()).hexdigest()
                if hashed_password == hash:
                    return password
    else:
        for password in passwords:
            hashed_password = hashlib.sha1(password.encode()).hexdigest()
            if hashed_password == hash:
                return password
    return "PASSWORD NOT IN DATABASE"