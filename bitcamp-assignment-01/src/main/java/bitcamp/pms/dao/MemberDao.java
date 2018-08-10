package bitcamp.pms.dao;

import java.util.List;
import java.util.Map;

import bitcamp.pms.domain.Member;

public interface MemberDao {
    List<Member> selectList(int bno);
    Member login(Member member);
    Member view(String name);
    int update(Member member);
    int delete(int bno);
    void deleteMember(String name);
    int insert(Member member);
    int manageMentAdd(Member member);
    int countAll();
}



