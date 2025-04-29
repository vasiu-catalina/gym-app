module.exports = (user) => {
    return {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        role: user.role,
        gender: user.gender,
        uuid: user.uuid,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        ...(user.role === "trainer" ? user.trainees : {}),
    };
};
