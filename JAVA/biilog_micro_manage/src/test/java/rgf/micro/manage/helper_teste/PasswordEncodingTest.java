package rgf.micro.manage.helper_teste;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.LdapShaPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.util.DigestUtils;

public class PasswordEncodingTest {

    static final String PASSWORD = "password";

    @Test
    void testHashingExample() { // Demonstra hash com md5
        System.out.println(DigestUtils.md5DigestAsHex(PASSWORD.getBytes()));

        String salted = PASSWORD + "TESTO COMPLEXO";
        System.out.println(DigestUtils.md5DigestAsHex(salted.getBytes()));
    }

    @Test
    void testNoOp() { // Demostra processo de password sem qualquer alteração.
        PasswordEncoder noOp = NoOpPasswordEncoder.getInstance();
        System.out.println(noOp.encode(PASSWORD));
    }

    @Test
    void testLdap() { // Demostra processo de password Legado. SSHA
        PasswordEncoder ldap = new LdapShaPasswordEncoder();
        System.out.println(ldap.encode(PASSWORD));
        System.out.println(ldap.encode(PASSWORD));
        String encodedPwd = ldap.encode(PASSWORD);

        assertTrue(ldap.matches(PASSWORD, encodedPwd));

        System.out.println(ldap.encode("1234"));

    }

    @Test
    void testSHA256() { // Demostra processo de password Legado. SSHA256
        PasswordEncoder sha256 = new StandardPasswordEncoder();
        System.out.println(sha256.encode(PASSWORD));
        System.out.println(sha256.encode(PASSWORD));
        String encodedPwd = sha256.encode(PASSWORD);

        assertTrue(sha256.matches(PASSWORD, encodedPwd));

        System.out.println(sha256.encode("1234"));

    }

    @Test
    void testBCrypt() { // Demostra processo de password Bcrypt (Quanto maior o numero mais demora para
                        // gerar.),
        PasswordEncoder bcrypt = new BCryptPasswordEncoder();
        System.out.println("PASSWORD:" + bcrypt.encode(PASSWORD));
        System.out.println("PASSWORD:" + bcrypt.encode(PASSWORD));
        String encodedPwd = bcrypt.encode(PASSWORD);
        assertTrue(bcrypt.matches(PASSWORD, encodedPwd));

        System.out.println("------ GERA HASH bcrypt (10) ----");
        System.out.println("ROOT:" + bcrypt.encode("ROOT"));

    }

    @Test
    void testBCrypt15() { // Demostra processo de password Bcrypt (Quanto maior o numero mais demora para
                          // gerar.),
        PasswordEncoder bcrypt = new BCryptPasswordEncoder(15);
        System.out.println(bcrypt.encode(PASSWORD));

    }

}
