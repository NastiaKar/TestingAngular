using CharacterAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CharacterAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CharacterController :  ControllerBase
{
    private readonly DataContext _context;
    
    public CharacterController(DataContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<Character>>> GetCharacters()
    {
        return Ok(await _context.Characters.ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<List<Character>>> CreateCharacter(Character character)
    {
        _context.Characters.Add(character);
        await _context.SaveChangesAsync();
        
        return Ok(await _context.Characters.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult<List<Character>>> UpdateCharacter(Character character)
    {
        var dbCharacter = await _context.Characters.FindAsync(character.Id);
        if (dbCharacter == null)
            return BadRequest("Character not found");

        dbCharacter.Name = character.Name;
        dbCharacter.FirstName = character.FirstName;
        dbCharacter.LastName = character.LastName;
        dbCharacter.WhereFrom = character.WhereFrom;

        await _context.SaveChangesAsync();

        return Ok(await _context.Characters.ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<Character>>> DeleteCharacter(int id)
    {
        var dbCharacter = await _context.Characters.FindAsync(id);
        if (dbCharacter == null)
            return BadRequest("Character not found");

        _context.Characters.Remove(dbCharacter);
        
        await _context.SaveChangesAsync();
        return Ok(await _context.Characters.ToListAsync());
    }
}