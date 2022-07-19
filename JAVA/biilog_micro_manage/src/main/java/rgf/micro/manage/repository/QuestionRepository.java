package rgf.micro.manage.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import rgf.micro.manage.domain.Questions;

public interface QuestionRepository extends PagingAndSortingRepository<Questions, Long> {
    // SELECT * FROM QUESTIONS q WHERE q.id IN (SELECT QUESTION_ID FROM
    // OWNER_QUESTIONS WHERE COMPANY_ID = 1 GROUP BY QUESTION_ID );
    @Query("SELECT q FROM Questions q WHERE q.id IN (SELECT oq.question.id FROM OwnerQuestions oq WHERE oq.company.id = ?1 GROUP BY oq.question.id)")
    public Iterable<Questions> findAllQuestionsByCompanyId(Long id);
}
