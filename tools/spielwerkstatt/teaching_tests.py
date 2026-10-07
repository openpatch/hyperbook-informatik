"""Read-only browser-test adapter and pinned desktop JUnit console dependency."""
from pathlib import Path
import hashlib
import os
import re
import urllib.request

VERSION = "1.11.4"
SHA256 = "b016ef6b1c3454d6d7c2c88ce081dabf289699686af6622d6e4e2e1b54b4a2fc"
FILENAME = f"junit-platform-console-standalone-{VERSION}.jar"
URL = f"https://repo.maven.apache.org/maven2/org/junit/platform/junit-platform-console-standalone/{VERSION}/{FILENAME}"


def junit_jar() -> Path:
    override = os.environ.get("SCRATCH_JUNIT_JAR")
    maven = Path.home() / ".m2/repository/org/junit/platform/junit-platform-console-standalone" / VERSION / FILENAME
    cache = Path.home() / ".cache/scratch4j-ecosystem" / FILENAME
    jar = Path(override) if override else (maven if maven.is_file() else cache)
    if not jar.is_file():
        if override:
            raise ValueError(f"JUnit file missing: {jar}")
        jar.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(URL, timeout=30) as response:
            contents = response.read(8 * 1024 * 1024)
        if hashlib.sha256(contents).hexdigest() != SHA256:
            raise ValueError("Downloaded JUnit checksum differs from the pinned artifact")
        jar.write_bytes(contents)
    if hashlib.sha256(jar.read_bytes()).hexdigest() != SHA256:
        raise ValueError(f"JUnit checksum differs from the pinned artifact: {jar}")
    return jar


def adapt(source: str) -> str:
    if not re.search(r"@Test\s*(?=(?:public\s+)?class\b)", source):
        return source
    source = re.sub(r"@Test\s*(?=(?:public\s+)?class\b)",
                    lambda match: re.sub(r"[^\r\n]", " ", match.group()), source)
    imports = "import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; "
    package = re.search(r"(?m)^\s*package\s+[\w.]+\s*;", source)
    if package:
        return source[:package.end()] + " " + imports + source[package.end():]
    return imports + source
