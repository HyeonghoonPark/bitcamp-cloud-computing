package bitcamp.pms.controller.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.pms.domain.Member;
import bitcamp.pms.service.MemberService;

//@CrossOrigin
@RestController
@RequestMapping("/member")
public class MemberController {
	
    @Autowired MemberService memberService;
    
    @RequestMapping("list/{bno}")
    public Object list(@PathVariable int bno) throws Exception {
        
    	System.out.println("리스트 컨트롤러 들어옴");
    	System.out.println(bno);
    	
        List<Member> list = memberService.list(bno);
        
        HashMap<String,Object> data = new HashMap<>();
        data.put("list", list);
        
        return data;
    }
    
    @RequestMapping("view/{name}")
    public Object view(@PathVariable String name) throws Exception {
        
    	System.out.println("뷰 컨트롤러 들어옴");
    	System.out.println(name);
    	
        Member member = memberService.view(name);
        
        HashMap<String,Object> data = new HashMap<>();
        data.put("member", member);
        
        return data;
    }
    
    @PostMapping("add")
    public Object add(Member member) throws Exception {
        HashMap<String,Object> result = new HashMap<>();
        System.out.println("컨트롤러 들어옴");
        System.out.println(member.getName());
        System.out.println(member.getEmail());
        System.out.println(member.getPassword());
        
        if(memberService.add(member) >= 1) {
        	result.put("status", "success");
        }else {
        	result.put("status", "fail");
        }
        return result;
    }
     
    @PostMapping("login")
    public Object view(Member member) throws Exception {
        HashMap<String,Object> data = new HashMap<>();
        System.out.println("로그인 컨트롤러 들어옴");
        data.put("member", memberService.login(member));
        if(data.get("member")==null) {
        	System.out.println("널임");
        	
        	data.put("status", "fail");
        }else {
        data.put("status", "success");
        }
        return data;
    }
    
    @PostMapping("managementAdd")
    public Object managementAdd(Member member) throws Exception {
        HashMap<String,Object> result = new HashMap<>();
        memberService.manageMentAdd(member);
        System.out.println("들어갔다 나왔음");
        result.put("status", "success");
        result.put("bno", member.getBno());
        return result;
    }
    
    @RequestMapping("remove")
    public Object delete(int bno) throws Exception {
        HashMap<String,Object> result = new HashMap<>();
        if (memberService.delete(bno) == 0) {
            result.put("status", "fail");
            result.put("error", "해당 아이디가 없습니다.");
        } else {
            result.put("status", "success");
        }
        return result;
    }
    
    @RequestMapping("removeMember")
    public Object deleteMember(String name) throws Exception {
        HashMap<String,Object> result = new HashMap<>();
        memberService.deleteMember(name);
         
        return result;
    }

}










