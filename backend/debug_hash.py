from app.core.security import get_password_hash

print("--- START DEBUG ---")
try:
    # 1. Test a simple string
    pw = "secret123"
    print(f"Hashing password: '{pw}' (Length: {len(pw)})")
    
    hashed = get_password_hash(pw)
    
    print(f"Success! Hash result: {hashed}")
    print("--- END DEBUG ---")

except Exception as e:
    print(f"\nCRASHED with error: {e}")
    print("This means the issue is inside security.py or the installed libraries.")
